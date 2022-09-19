import Image from "next/image";
import React, { useState } from "react";
import { Comment, User } from "../libs/interface";
import Input from "./shared/Input";

import { FaUser } from "react-icons/fa";
import { FaWindowClose } from "react-icons/fa";
import ShareButton from "./shared/shareButton";
import useMutation from "../libs/mutation";
import { useForm } from "react-hook-form";
import ErrorMessage from "./shared/ErrorMessage";

interface CommentWithUser extends Comment {
  user: User;
}

interface CommentsProps {
  id?: string;
  comments?: CommentWithUser[];
}

interface CommentForm {
  text: string;
  error?: any;
}

interface CommentMutation {
  ok: boolean;
}

interface DeleteCommentMutation {
  ok: boolean;
}

const Comments: React.FC<CommentsProps> = ({ comments, id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<CommentForm>();
  const [commentId, setCommentId] = useState("");

  const [createComment, { data, error, loading }] =
    useMutation<CommentMutation>(`videos/${id}/comment`);

  const [
    deleteComment,
    { data: deleteCommentData, loading: deleteCommentLoading },
  ] = useMutation<DeleteCommentMutation>(
    `videos/${id}/delete-comment?commentId=${commentId}`
  );

  const onDelete = (id: string) => {
    if (deleteCommentLoading) return;
    if (!id) return;
    setCommentId(id);
    if (commentId) deleteComment({});
  };

  const onValid = (data: CommentForm) => {
    if (loading) return;
    if (error) {
      setError("error", { message: error });
    }
    createComment(data);
    reset();
  };

  const errorMessage = errors.error?.message || errors.text?.message;

  return (
    <section className="space-y-10">
      <form onSubmit={handleSubmit(onValid)} className="space-y-4">
        <div>
          <Input
            register={register("text", { required: "Comment is empty." })}
            placeholder="Write Comment"
            id="comment"
            label="Comment"
            type="text"
          />
          {errorMessage && <ErrorMessage error={errorMessage} />}
        </div>
        <div className="flex justify-center items-center bg-zinc-700 w-[50%] rounded-md py-1 hover:bg-slate-900 transition-all cursor-pointer">
          <ShareButton text="Submit" loading={loading} />
        </div>
      </form>

      <div>
        {comments?.map((comment) => (
          <div
            className="mb-10 flex items-center space-x-3 justify-between"
            key={comment._id}
          >
            <div className="flex items-center space-x-2">
              <div>
                {comment?.user?.avatarId ? (
                  <div className="relative w-10 h-10 rounded-full">
                    <Image
                      src={comment.user.avatarId}
                      layout="fill"
                      objectFit="cover"
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-zinc-500 flex justify-center items-center">
                    <FaUser />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div>
                  <span className="font-bold">{comment?.user?.username}</span>
                </div>
                <div>
                  <span>{comment?.text}</span>
                </div>
              </div>
            </div>

            {comment.user && (
              <div>
                <span
                  onClick={() => onDelete(comment._id)}
                  className=" text-rose-400 hover:text-rose-500 transition-all cursor-pointer"
                >
                  <FaWindowClose />
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
export default Comments;
