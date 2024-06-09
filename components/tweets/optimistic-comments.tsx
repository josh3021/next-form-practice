import { Comments } from "./comments";

interface IOptimisticCommentsListProps {
  optimisticComments: any[];
}

export function OptimisticCommentsList({
  optimisticComments,
}: IOptimisticCommentsListProps) {
  return optimisticComments.map((comment, index) => (
    <Comments key={index} comment={comment} />
  ));
}
