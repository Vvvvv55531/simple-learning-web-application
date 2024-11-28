from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=200) 
    description = models.TextField()        
    image_url = models.URLField(blank=True, null=True) 

    def str(self):
        return self.name