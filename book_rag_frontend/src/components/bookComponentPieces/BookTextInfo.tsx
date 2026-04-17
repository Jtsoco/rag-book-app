
export interface BookTextInfoProps {
  title: string;
  author: string;
  description: string;
}



export const BookTextInfo = (props: BookTextInfoProps) => {
  const { title, author, description } = props;
  return (
    <div>
          <div className="md:w-2/3 flex flex-col justify-start">
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-xl text-gray-600 mb-4">by {author}</p>
          <p className="text-gray-700 mb-6 leading-relaxed">{description}</p>

        </div>
      </div>
  )
};
