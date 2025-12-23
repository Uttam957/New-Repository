import unittest
import json
from app import app

class TaskApiTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_create_and_get_task(self):
        # Test creating a task
        response = self.app.post('/api/tasks', 
                                 data=json.dumps({'title': 'Test Task'}),
                                 content_type='application/json')
        self.assertEqual(response.status_code, 201)
        
        # Test getting tasks
        response = self.app.get('/api/tasks')
        data = json.loads(response.data)
        self.assertTrue(len(data) > 0)
        self.assertEqual(data[-1]['title'], 'Test Task')

    def test_comment_crud(self):
        # 1. Create a task first
        task_res = self.app.post('/api/tasks', 
                                 data=json.dumps({'title': 'Comment Task'}),
                                 content_type='application/json')
        task_id = json.loads(task_res.data)['id']

        # 2. Add a comment
        comment_res = self.app.post(f'/api/tasks/{task_id}/comments',
                                    data=json.dumps({'text': 'New Comment'}),
                                    content_type='application/json')
        self.assertEqual(comment_res.status_code, 201)
        comment_id = json.loads(comment_res.data)['id']

        # 3. Edit the comment (Task #1 Requirement)
        edit_res = self.app.put(f'/api/tasks/{task_id}/comments/{comment_id}',
                                   data=json.dumps({'text': 'Updated Comment'}),
                                   content_type='application/json')
        self.assertEqual(edit_res.status_code, 200)

        # 4. Delete the comment (Task #1 Requirement)
        del_res = self.app.delete(f'/api/tasks/{task_id}/comments/{comment_id}')
        self.assertEqual(del_res.status_code, 200)

if __name__ == '__main__':
    unittest.main()