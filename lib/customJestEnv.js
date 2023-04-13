import NodeEnvironment from 'jest-environment-node';
import {ḾongoMemoryServer} from 'mongodb-memory-server';
import connectDatabase from './connectDatabase';

export default class CustonEnv extends NodeEnvironment {
	constructor(config, context) {
		super(config, context);

		this.testPath = context.testPath;
		this.docblockPragmas = context.docblockPragmas;
	}
	async setup() {
		await super.setup();
		const mongod = new ḾongoMemoryServer();
		await mongod.start();

		this.mongod = mongod;

		process.env.MONGO_URL = this.global.__MONGO_URL__ = await this.mongod.getUri();

		this.mongoose = await connectDatabase();
		
		//Starts to setup default data
		//Then close connection
	}
	async teardown() {
		await super.teardown();
		await this.mongoose?.connection.close();
		await this.mongod?.stop();
	}
	getVmContext() {
		return super.getVmContext();
	}
}