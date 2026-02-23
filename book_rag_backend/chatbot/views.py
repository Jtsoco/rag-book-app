from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
# Create your views here.


class SingleChatMessageAPIView(APIView):

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({'error': 'Authentication required'}, status=401)
        else:
            pass
        # user sends jwt, verify if logged in
        # query gets sent too, as data in body
        # future versions will use convo id when not single shot
