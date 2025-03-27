# 🔌 Spark Connect Notebook – Run Spark Code Remotely with Ease

A minimal, Dockerized setup to execute **PySpark** and **SQL** code remotely on a Spark cluster using **Spark Connect**.  
Includes a simple backend API and frontend UI to interact with Spark like a remote notebook.

---

## ✨ Features

- 💻 Run Spark code (SQL or Python) **outside the cluster**
- ⚡ Powered by **Spark Connect** (Apache Spark 3.5+)  
- 🐳 Fully Dockerized – one command to launch everything  
- 🧪 Includes backend API + frontend UI to test Spark interactions  
- 📁 Example scripts included  

---

## 🚀 Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/achraf-nasri/spark-connect-notebook.git
cd spark-connect-notebook
```

### 2. Launch the full stack

```bash
docker-compose up
```

This will start the following services:
- 🧠 **Spark Master**
- ⚙️ **2 Spark Workers**
- 🔗 **Spark Connect Server**
- 🧪 **Backend API**
- 💻 **Frontend UI**

---

## 🌐 Access the Components

Once started, open your browser and visit:

| Component         | URL                        |
|------------------|----------------------------|
| 💻  Notebook UI         | [http://localhost:4200](http://localhost:4200) |
| 🧪 Backend API                       | [http://localhost:8000](http://localhost:8000/docs) |
| 🔗 Spark Connect UI | [http://localhost:4040](http://localhost:4040) |

> ℹ️ These ports can be adjusted in `docker-compose.yml` if needed.

---

## 📂 Project Structure

```
spark-connect-notebook/
├── docker-compose.yml         # Orchestrates all services
├── backend/                   # FastAPI backend
│   ├── main.py                # API entrypoint
│   └── requirements.txt
├── frontend/                  # UI (Angular)
│   └── ...                    # UI source code
├── sample-data                # Sample files loaded to cluster for querying
├── LICENSE
└── README.md
```


---

## 🛠 Requirements

- ✅ Docker
- ✅ Docker Compose

No need to install Spark, Java, or Python locally. Everything runs in containers.

---

## 📬 Contact

Feel free to contact me on [LinkedIn](https://linkedin.com/in/nasriachraf) for feedback, questions, or collaboration opportunities.

---

