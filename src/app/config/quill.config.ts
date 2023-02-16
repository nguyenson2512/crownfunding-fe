import * as QuillNamespace from 'quill';
import ImageUploader from 'quill-image-uploader';

const Quill: any = QuillNamespace;

// Register CSS inline styles
Quill.register('modules/imageUploader', ImageUploader);

export const initQuillConfig = (
  onImageUpload: (file: File) => Promise<string>
) => {
  return {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline'], // toggled buttons
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }],
        [{ align: [] }],
        ['clean'], // clear format
        ['image'],
      ],
    },
    imageUploader: {
      upload: onImageUpload,
    },
  };
};
