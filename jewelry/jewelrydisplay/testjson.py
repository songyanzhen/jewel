import json

j = []
for i in range(10):
    j.append({i: i*i})
j = json.dumps(j)
print(j)
print(type(j))
j = json.loads(j)
for i in j:
    print(i)
print(type(j))

j = {}
for i in range(10):
    j[i] = i*i
j = json.dumps(j)
print(j)
print(type(j))
j = json.loads(j)
for i in j:
    print(i, j[i])
print(type(j))