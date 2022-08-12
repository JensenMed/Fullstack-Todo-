import imp
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Todo
from .serializers import TodoSerializer



def front(request):
    context = { 
        
    }

    return render(request, "index.html", context)





@api_view(['GET', 'POST'])

def todo(request):

    if request.method == 'GET':
        note = Todo.objects.all()
        serializer = TodoSerializer(note, many = True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = TodoSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def todo_detail(request, pk):
    try:
        note = Todo.objects.get(pk = pk)
    except Todo.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)

    
    if request.method == 'DELETE':
        note.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)




