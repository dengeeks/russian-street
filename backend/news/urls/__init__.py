# import importlib
# import os
#
# # Список для всех URL-шаблонов
# urlpatterns = []
#
# module_dir = os.path.dirname(__file__)
#
# for module in os.listdir(module_dir):
#     if module.endswith('.py') and not module.startswith('_'):
#         module_name = module[:-3]
#         module = importlib.import_module(f'{__name__}.{module_name}')
#         urlpatterns.extend(module.urlpatterns)