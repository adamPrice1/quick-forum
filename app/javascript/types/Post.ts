type PostType = {

    id: number,
    created_at: string,
    updated_at: string,
    user_id: number,
    title: string,
    content: string,
    comments: CommentType[]
}

type CommentType = {
    id: number,
    created_at: string
    updated_at: string,
    post_id: number,
    user_id: number,
    content: string,
    user: {
        username: string
    }
}

export default PostType;
