import { IRouter } from "express";
export interface IDocsSchema {
    info: {
        description?: string;
        version?: string;
        title?: string;
    };
    host: string;
    basePath: string;
    tags: [];
    paths: {};
    definitions: {};
}
/**
 * Generate Swagger Doc Json
 * @param {IDocsSchema} - config data for swagger documentation
 * @return {IRouter} - express router
 */
declare const useSwaggerDocs: (config?: IDocsSchema) => IRouter;
export default useSwaggerDocs;
