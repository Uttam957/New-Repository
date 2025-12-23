from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

tasks = []
task_id_counter = 1
comment_id_counter = 1

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "status": "Backend is running",
        "endpoints": ["/api/tasks", "/api/tasks/<id>/comments"]
    })


@app.route("/api/tasks", methods=["GET"])
def get_tasks():
    return jsonify(tasks)

@app.route("/api/tasks", methods=["POST"])
def add_task():
    global task_id_counter
    data = request.json
    if not data or "title" not in data:
        return jsonify({"error": "Title is required"}), 400
    
    task = {
        "id": task_id_counter,
        "title": data["title"],
        "comments": []
    }
    tasks.append(task)
    task_id_counter += 1
    return jsonify(task), 201

@app.route("/api/tasks/<int:id>", methods=["PUT"])
def edit_task(id):
    data = request.json
    for task in tasks:
        if task["id"] == id:
            task["title"] = data.get("title", task["title"])
            return jsonify(task)
    return jsonify({"error": "Task not found"}), 404

@app.route("/api/tasks/<int:id>", methods=["DELETE"])
def delete_task(id):
    global tasks
    tasks = [t for t in tasks if t["id"] != id]
    return jsonify({"message": "Task deleted"}), 200


@app.route("/api/tasks/<int:task_id>/comments", methods=["POST"])
def add_comment(task_id):
    global comment_id_counter
    data = request.json
    
    comment_text = data.get("text")
    if not comment_text:
        return jsonify({"error": "Comment text is required"}), 400

    for task in tasks:
        if task["id"] == task_id:
            comment = {
                "id": comment_id_counter,
                "text": comment_text
            }
            task["comments"].append(comment)
            comment_id_counter += 1
            return jsonify(comment), 201
            
    return jsonify({"error": "Task not found"}), 404

@app.route("/api/tasks/<int:task_id>/comments/<int:id>", methods=["PUT"])
def edit_comment(task_id, id):
    data = request.json
    for task in tasks:
        if task["id"] == task_id:
            for comment in task["comments"]:
                if comment["id"] == id:
                    comment["text"] = data.get("text", comment["text"])
                    return jsonify(comment)
    return jsonify({"error": "Comment or Task not found"}), 404

@app.route("/api/tasks/<int:task_id>/comments/<int:id>", methods=["DELETE"])
def delete_comment(task_id, id):
    for task in tasks:
        if task["id"] == task_id:
            original_count = len(task["comments"])
            task["comments"] = [c for c in task["comments"] if c["id"] != id]
            if len(task["comments"]) < original_count:
                return jsonify({"message": "Comment deleted"}), 200
            return jsonify({"error": "Comment not found"}), 404
    return jsonify({"error": "Task not found"}), 404

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000, debug=True)