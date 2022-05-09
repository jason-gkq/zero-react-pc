import { Models } from "../../../../rapper/index";

export type IQueryParams = {
    pageNum: number,
    pageSize: number,
    postCode: string,
    postName: string,
    status: string
}

export type IReqQueryPostList = Models['GET/system/post/list']['Req']
export type IResQueryPostList = Models['GET/system/post/list']['Res']['rows'][0]

export type IReqGetPost = Models['GET/system/post/:postId']['Req']
export type IResGetPost = Models['GET/system/post/:postId']['Res']

export type IReqAddPost = Models['POST/system/post']['Req']
export type IResAddPost = Models['POST/system/post']['Res']

export type IReqUpdatePost = Models['PUT/system/post']['Req']
export type IResUpdatePost = Models['PUT/system/post']['Res']

export type IReqDelPost = Models['DELETE/system/post/:id']['Req']
export type IResDelPost = Models['DELETE/system/post/:id']['Res']

export type IReqExportPost = Models['GET/system/post/export']['Req']
export type IResExportPost = Models['GET/system/post/export']['Res']

