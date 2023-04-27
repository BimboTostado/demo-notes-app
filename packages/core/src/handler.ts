import { APIGatewayEvent, Context, APIGatewayProxyHandler } from "aws-lambda";

export type AWSLambda = (event: APIGatewayEvent, context?: Context) => Promise<any>;

export default function handler(lambdaFunc: AWSLambda){

  const fn : APIGatewayProxyHandler = async(event, context) =>{

    let body:any, statusCode: number;
    try {
      body = await lambdaFunc(event, context);
      statusCode = 200;
    } 
    catch (error: any) {
      //debug.flush(error);
      body = {error: error.message}
      statusCode = 500;
    }
    return {statusCode, body: JSON.stringify(body)}
  }
 return fn;
}