import { Callback, Context } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

/**
 * Handler method to persist Game Voting in DynamoDb table.
 * @param event 
 * @param context 
 * @param callback 
 * @returns 
 */
export async function handler(event: any, context: Context, callback: Callback) {
    console.log("event", event);
    const item: GameVoting = event;
    item.id = item.gameId + item.customerId + item.logTimestamp;
    console.log("Item", item);
    const command = new PutCommand({
        TableName: "game-customer-vote",
        Item: item
    });

    const response = await docClient.send(command);
    console.log("response", response);
    return response;
}

interface GameVoting {
    id: string;
    gameId: string;
    customerId: string;
    voting: string;
    logTimestamp: string;
}