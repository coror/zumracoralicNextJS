import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import Image from 'next/image';

export const getRichTextOptions = () => {
  return {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { file, title } = node.data.target.fields;
        const imageUrl = file.url.startsWith('//') ? `https:${file.url}` : file.url;
        return (
          <div className='my-4'>
            <Image
              src={imageUrl}
              alt={title}
              width={file.details.image.width}
              height={file.details.image.height}
              className='rounded-lg'
            />
          </div>
        );
      },
      [INLINES.HYPERLINK]: (node, children) => (
        <a href={node.data.uri} className="text-blue-600 hover:underline">
          {children}
        </a>
      ),
    },
  };
};
