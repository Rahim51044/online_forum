// import { useParams } from "react-router";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { FacebookShareButton, FacebookIcon } from "react-share";
// import { useState } from "react";
// import useAuth from "../../../hooks/useAuth";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const PostDetails = () => {
//   const { id } = useParams();
//   const axiosSecure = useAxiosSecure();
//   const queryClient = useQueryClient();
//   const { user } = useAuth();
//   const [commentText, setCommentText] = useState("");

//   const { data: post, isLoading } = useQuery({
//     queryKey: ["post", id],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/post/${id}`);
//       return res.data;
//     },
//   });

//   const voteMutation = useMutation({
//     mutationFn: async (type) => {
//       await axiosSecure.patch(`/post/vote/${id}`, { type });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["post", id] });
//     },
//   });

//   const commentMutation = useMutation({
//     mutationFn: async () => {
//       await axiosSecure.post("/comments", {
//         postId: id,
//         text: commentText,
//         userEmail: user.email,
//         userName: user.displayName,
//         time: new Date(),
//       });
//     },
//     onSuccess: () => {
//       setCommentText("");
//       queryClient.invalidateQueries({ queryKey: ["post", id] });
//     },
//   });

//   if (isLoading) return <p>Loading...</p>;
//   if (!post) return <p>Post not found</p>;

//   const {
//     authorImage,
//     authorName,
//     title,
//     description,
//     tags,
//     createdAt,
//     upVote,
//     downVote,
//     comments = [],
//   } = post;

//   const shareUrl = `${window.location.origin}/post/${id}`;

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <div className="flex items-center gap-3 mb-4">
//         <img src={authorImage} alt="Author" className="w-10 h-10 rounded-full" />
//         <div>
//           <p className="font-semibold">{authorName}</p>
//           <p className="text-xs text-gray-500">{new Date(createdAt).toLocaleString()}</p>
//         </div>
//       </div>

//       <h1 className="text-2xl font-bold mb-2">{title}</h1>
//       <p className="mb-3 text-gray-700">{description}</p>
//       <div className="mb-4">
//         {tags?.map((tag, i) => (
//           <span key={i} className="badge badge-outline mr-1">{tag}</span>
//         ))}
//       </div>

//       <div className="flex items-center gap-4 mb-6">
//         <button onClick={() => voteMutation.mutate("up")} className="btn btn-sm">
//           👍 {upVote}
//         </button>
//         <button onClick={() => voteMutation.mutate("down")} className="btn btn-sm">
//           👎 {downVote}
//         </button>
//         <FacebookShareButton url={shareUrl} quote={title}>
//           <FacebookIcon size={32} round />
//         </FacebookShareButton>
//       </div>

//       <hr className="my-6" />

//       {/* Comments Section */}
//       <div>
//         <h2 className="text-xl font-bold mb-4">Comments ({comments.length})</h2>

//         {user ? (
//           <div className="mb-6">
//             <textarea
//               value={commentText}
//               onChange={(e) => setCommentText(e.target.value)}
//               className="textarea textarea-bordered w-full mb-2"
//               placeholder="Write your comment..."
//             />
//             <button
//               onClick={() => commentMutation.mutate()}
//               className="btn btn-primary btn-sm"
//               disabled={!commentText.trim()}
//             >
//               Comment
//             </button>
//           </div>
//         ) : (
//           <p className="text-gray-500">Please log in to comment.</p>
//         )}

//         <div className="space-y-3">
//           {comments.map((c, i) => (
//             <div key={i} className="p-3 border rounded">
//               <p className="font-semibold">{c.userName}</p>
//               <p className="text-sm text-gray-600">{new Date(c.time).toLocaleString()}</p>
//               <p className="mt-1">{c.text}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostDetails;





import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PostDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [commentText, setCommentText] = useState("");

  const { data: post, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/post/${id}`);
      return res.data;
    },
  });

  const voteMutation = useMutation({
    mutationFn: async (type) => {
      await axiosSecure.patch(`/post/vote/${id}`, { type });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", id] });
    },
  });

  const commentMutation = useMutation({
    mutationFn: async () => {
      await axiosSecure.post("/comments", {
        postId: id,
        text: commentText,
        userEmail: user.email,
        userName: user.displayName,
        time: new Date(),
      });
    },
    onSuccess: () => {
      setCommentText("");
      queryClient.invalidateQueries({ queryKey: ["post", id] });
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (!post) return <p className="text-center py-10">Post not found</p>;

  const {
    authorImage,
    authorName,
    title,
    description,
    tags,
    createdAt,
    upVote,
    downVote,
    comments = [],
  } = post;

  const shareUrl = `${window.location.origin}/post/${id}`;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg border border-gray-700">
        {/* Author Info */}
        <div className="flex items-center gap-4 mb-6">
          <img src={authorImage} alt="Author" className="w-12 h-12 rounded-full border-2 border-blue-500" />
          <div>
            <p className="font-bold text-lg">{authorName}</p>
            <p className="text-sm text-gray-400">{new Date(createdAt).toLocaleString()}</p>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-blue-400 mb-3">{title}</h1>

        {/* Description */}
        <p className="text-gray-300 text-md mb-4 leading-relaxed">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags?.map((tag, i) => (
            <span key={i} className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        {/* Votes and Share */}
        <div className="flex items-center justify-between border-t border-gray-700 pt-4 mb-6">
          <div className="flex gap-4">
            <button
              onClick={() => voteMutation.mutate("up")}
              className="btn btn-sm bg-green-600 hover:bg-green-700 text-white"
            >
              👍 {upVote}
            </button>
            <button
              onClick={() => voteMutation.mutate("down")}
              className="btn btn-sm bg-red-600 hover:bg-red-700 text-white"
            >
              👎 {downVote}
            </button>
          </div>
          <FacebookShareButton url={shareUrl} quote={title}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </div>

        {/* Comment Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Comments ({comments.length})</h2>

          {user ? (
            <div className="mb-6">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="textarea textarea-bordered w-full text-black"
                placeholder="Write your comment..."
              />
              <button
                onClick={() => commentMutation.mutate()}
                className="btn btn-primary btn-sm mt-2"
                disabled={!commentText.trim()}
              >
                Comment
              </button>
            </div>
          ) : (
            <p className="text-gray-500">Please log in to comment.</p>
          )}

          {/* All Comments */}
          <div className="space-y-4">
            {comments.map((c, i) => (
              <div key={i} className="bg-gray-800 p-3 rounded border border-gray-700">
                <p className="font-semibold">{c.userName}</p>
                <p className="text-xs text-gray-400">{new Date(c.time).toLocaleString()}</p>
                <p className="mt-1 text-gray-300">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
