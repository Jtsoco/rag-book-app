from django.urls import path, include


# so the open library keys for authors and books has works/ or authors/ followed by the key, so my question to myself is do i just want books/ as the url, or works/ and authors/ and the key will be passed as a parameter to the view and they already include part of the url path? or do i set it to books/ and then it becomes books/works/OL32423423 and books/authors/OL232343 ?
urlpatterns = [

]
# nothing as of yet
