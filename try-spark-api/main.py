from contextlib import redirect_stdout
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pyspark.sql import SparkSession
from fastapi.middleware.cors import CORSMiddleware
import sys
import io

app = FastAPI()

spark = None

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to specific origin in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def load_sample_data():
    global spark

    spark = SparkSession.builder.remote("sc://host.docker.internal:15002").getOrCreate()

    df_people = spark.read.option("header", True).csv("/data/consumers.csv")
    df_sales = spark.read.option("header", True).csv("/data/sales.csv")
    df_people.createOrReplaceTempView("consumers")
    df_sales.createOrReplaceTempView("sales")

class CodeRequest(BaseModel):
    code: str
    language: str  # 'python' or 'sql'

@app.post("/run-job")
def run_code(req: CodeRequest):
    global spark

    try:
        
        if req.language == 'sql':
            df = spark.sql(req.code).limit(10)
            output_buffer = io.StringIO()

            with redirect_stdout(output_buffer):
                df.show(truncate=False)  # Avoid truncating long strings

            output = output_buffer.getvalue()
            return {"output": output}

        elif req.language == 'python':
            # Redirect stdout to capture df.show()
            old_stdout = sys.stdout
            redirected_output = sys.stdout = io.StringIO()
            local_vars = {'spark': spark}

            try:
                exec(req.code, {}, local_vars)
                output = redirected_output.getvalue()
            finally:
                sys.stdout = old_stdout

            return {"output": output or "Code executed successfully."}

        else:
            raise HTTPException(status_code=400, detail="Unsupported language.")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
