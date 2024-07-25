const Post = ({ post }) => {
  return (
    <article className="p-4">
      <h2 className="text-xl mb-6 font-extrabold leading-tight text-gray-900 sm:text-2xl">
        {post.postTitle}
      </h2>
      <img className="mb-6 w-2/3 mx-auto sm:w-1/3" src={post.image} alt="" />
      <p className="text-md leading-relaxed sm:text-lg"> {post.postContent}</p>
    </article>
  );
};

export default Post;
