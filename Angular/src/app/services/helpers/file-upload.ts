export class FileUploadHelper {
  static onFileSelected(event: any, currentImage: string, callback: Function) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        // Render ảnh mới ra label để preview
        callback(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  }
}
