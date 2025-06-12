def setup_image_path(self, filename: str):
    filename = filename.replace(' ', '_')
    return f'uploads/{self.__class__.__name__.lower()}/{self.pk}/{filename}'
