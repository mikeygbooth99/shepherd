import { ProviderCallWithPid } from '@src/ducks/providerBalancer/providerCalls';
import { Task } from 'redux-saga';
import { IProviderCall } from '../providerCalls';

export interface IWorker {
  task: Task;
  assignedProvider: string;
  currentPayload: IProviderCall | null;
}

export interface WorkerState {
  [workerId: string]: Readonly<IWorker>;
}

export enum WORKER {
  PROCESSING = 'WORKER_PROCESSING',
  SPAWNED = 'WORKER_SPAWNED',
  KILLED = 'WORKER_KILLED',
}

export interface WorkerSpawnedAction {
  type: WORKER.SPAWNED;
  payload: {
    providerId: string;
    workerId: string;
    task: Task;
  };
}

export interface WorkerProcessingAction {
  type: WORKER.PROCESSING;
  payload: {
    workerId: string;
    currentPayload: ProviderCallWithPid;
  };
}

export interface WorkerKilledAction {
  type: WORKER.KILLED;
  payload: {
    providerId: string;
    workerId: string;
    error: Error;
  };
}

export type WorkerAction =
  | WorkerSpawnedAction
  | WorkerProcessingAction
  | WorkerKilledAction;
