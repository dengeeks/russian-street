import importlib
import os

from django.urls import include, path

urlpatterns = []

module_dir = os.path.dirname(__file__)

for module_file in os.listdir(module_dir):
    if module_file.endswith('.py') and not module_file.startswith('_'):
        module_name = module_file[:-3]
        module = importlib.import_module(f'{__name__}.{module_name}')
        if hasattr(module, 'router'):
            urlpatterns.append(path('', include(module.router.urls)))
