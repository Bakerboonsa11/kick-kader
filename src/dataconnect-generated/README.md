# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListTasksForProject*](#listtasksforproject)
  - [*GetUserProfile*](#getuserprofile)
- [**Mutations**](#mutations)
  - [*AddCommentToTask*](#addcommenttotask)
  - [*CreateNewProject*](#createnewproject)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListTasksForProject
You can execute the `ListTasksForProject` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listTasksForProject(vars: ListTasksForProjectVariables): QueryPromise<ListTasksForProjectData, ListTasksForProjectVariables>;

interface ListTasksForProjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTasksForProjectVariables): QueryRef<ListTasksForProjectData, ListTasksForProjectVariables>;
}
export const listTasksForProjectRef: ListTasksForProjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTasksForProject(dc: DataConnect, vars: ListTasksForProjectVariables): QueryPromise<ListTasksForProjectData, ListTasksForProjectVariables>;

interface ListTasksForProjectRef {
  ...
  (dc: DataConnect, vars: ListTasksForProjectVariables): QueryRef<ListTasksForProjectData, ListTasksForProjectVariables>;
}
export const listTasksForProjectRef: ListTasksForProjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTasksForProjectRef:
```typescript
const name = listTasksForProjectRef.operationName;
console.log(name);
```

### Variables
The `ListTasksForProject` query requires an argument of type `ListTasksForProjectVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListTasksForProjectVariables {
  projectId: UUIDString;
}
```
### Return Type
Recall that executing the `ListTasksForProject` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTasksForProjectData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListTasksForProjectData {
  tasks: ({
    id: UUIDString;
    title: string;
    description: string;
    status: string;
    dueDate?: TimestampString | null;
    assignedTo?: {
      id: UUIDString;
      displayName: string;
    } & User_Key;
  } & Task_Key)[];
}
```
### Using `ListTasksForProject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTasksForProject, ListTasksForProjectVariables } from '@dataconnect/generated';

// The `ListTasksForProject` query requires an argument of type `ListTasksForProjectVariables`:
const listTasksForProjectVars: ListTasksForProjectVariables = {
  projectId: ..., 
};

// Call the `listTasksForProject()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTasksForProject(listTasksForProjectVars);
// Variables can be defined inline as well.
const { data } = await listTasksForProject({ projectId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTasksForProject(dataConnect, listTasksForProjectVars);

console.log(data.tasks);

// Or, you can use the `Promise` API.
listTasksForProject(listTasksForProjectVars).then((response) => {
  const data = response.data;
  console.log(data.tasks);
});
```

### Using `ListTasksForProject`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTasksForProjectRef, ListTasksForProjectVariables } from '@dataconnect/generated';

// The `ListTasksForProject` query requires an argument of type `ListTasksForProjectVariables`:
const listTasksForProjectVars: ListTasksForProjectVariables = {
  projectId: ..., 
};

// Call the `listTasksForProjectRef()` function to get a reference to the query.
const ref = listTasksForProjectRef(listTasksForProjectVars);
// Variables can be defined inline as well.
const ref = listTasksForProjectRef({ projectId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTasksForProjectRef(dataConnect, listTasksForProjectVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.tasks);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.tasks);
});
```

## GetUserProfile
You can execute the `GetUserProfile` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUserProfile(): QueryPromise<GetUserProfileData, undefined>;

interface GetUserProfileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserProfileData, undefined>;
}
export const getUserProfileRef: GetUserProfileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserProfile(dc: DataConnect): QueryPromise<GetUserProfileData, undefined>;

interface GetUserProfileRef {
  ...
  (dc: DataConnect): QueryRef<GetUserProfileData, undefined>;
}
export const getUserProfileRef: GetUserProfileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserProfileRef:
```typescript
const name = getUserProfileRef.operationName;
console.log(name);
```

### Variables
The `GetUserProfile` query has no variables.
### Return Type
Recall that executing the `GetUserProfile` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserProfileData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserProfileData {
  user?: {
    id: UUIDString;
    displayName: string;
    email: string;
    photoUrl?: string | null;
    role?: string | null;
  } & User_Key;
}
```
### Using `GetUserProfile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserProfile } from '@dataconnect/generated';


// Call the `getUserProfile()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserProfile();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserProfile(dataConnect);

console.log(data.user);

// Or, you can use the `Promise` API.
getUserProfile().then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetUserProfile`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserProfileRef } from '@dataconnect/generated';


// Call the `getUserProfileRef()` function to get a reference to the query.
const ref = getUserProfileRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserProfileRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## AddCommentToTask
You can execute the `AddCommentToTask` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addCommentToTask(vars: AddCommentToTaskVariables): MutationPromise<AddCommentToTaskData, AddCommentToTaskVariables>;

interface AddCommentToTaskRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddCommentToTaskVariables): MutationRef<AddCommentToTaskData, AddCommentToTaskVariables>;
}
export const addCommentToTaskRef: AddCommentToTaskRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addCommentToTask(dc: DataConnect, vars: AddCommentToTaskVariables): MutationPromise<AddCommentToTaskData, AddCommentToTaskVariables>;

interface AddCommentToTaskRef {
  ...
  (dc: DataConnect, vars: AddCommentToTaskVariables): MutationRef<AddCommentToTaskData, AddCommentToTaskVariables>;
}
export const addCommentToTaskRef: AddCommentToTaskRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addCommentToTaskRef:
```typescript
const name = addCommentToTaskRef.operationName;
console.log(name);
```

### Variables
The `AddCommentToTask` mutation requires an argument of type `AddCommentToTaskVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddCommentToTaskVariables {
  taskId: UUIDString;
  userId: UUIDString;
  content: string;
}
```
### Return Type
Recall that executing the `AddCommentToTask` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddCommentToTaskData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddCommentToTaskData {
  comment_insert: Comment_Key;
}
```
### Using `AddCommentToTask`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addCommentToTask, AddCommentToTaskVariables } from '@dataconnect/generated';

// The `AddCommentToTask` mutation requires an argument of type `AddCommentToTaskVariables`:
const addCommentToTaskVars: AddCommentToTaskVariables = {
  taskId: ..., 
  userId: ..., 
  content: ..., 
};

// Call the `addCommentToTask()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addCommentToTask(addCommentToTaskVars);
// Variables can be defined inline as well.
const { data } = await addCommentToTask({ taskId: ..., userId: ..., content: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addCommentToTask(dataConnect, addCommentToTaskVars);

console.log(data.comment_insert);

// Or, you can use the `Promise` API.
addCommentToTask(addCommentToTaskVars).then((response) => {
  const data = response.data;
  console.log(data.comment_insert);
});
```

### Using `AddCommentToTask`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addCommentToTaskRef, AddCommentToTaskVariables } from '@dataconnect/generated';

// The `AddCommentToTask` mutation requires an argument of type `AddCommentToTaskVariables`:
const addCommentToTaskVars: AddCommentToTaskVariables = {
  taskId: ..., 
  userId: ..., 
  content: ..., 
};

// Call the `addCommentToTaskRef()` function to get a reference to the mutation.
const ref = addCommentToTaskRef(addCommentToTaskVars);
// Variables can be defined inline as well.
const ref = addCommentToTaskRef({ taskId: ..., userId: ..., content: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addCommentToTaskRef(dataConnect, addCommentToTaskVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.comment_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.comment_insert);
});
```

## CreateNewProject
You can execute the `CreateNewProject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createNewProject(vars: CreateNewProjectVariables): MutationPromise<CreateNewProjectData, CreateNewProjectVariables>;

interface CreateNewProjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNewProjectVariables): MutationRef<CreateNewProjectData, CreateNewProjectVariables>;
}
export const createNewProjectRef: CreateNewProjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createNewProject(dc: DataConnect, vars: CreateNewProjectVariables): MutationPromise<CreateNewProjectData, CreateNewProjectVariables>;

interface CreateNewProjectRef {
  ...
  (dc: DataConnect, vars: CreateNewProjectVariables): MutationRef<CreateNewProjectData, CreateNewProjectVariables>;
}
export const createNewProjectRef: CreateNewProjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createNewProjectRef:
```typescript
const name = createNewProjectRef.operationName;
console.log(name);
```

### Variables
The `CreateNewProject` mutation requires an argument of type `CreateNewProjectVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateNewProjectVariables {
  name: string;
  description: string;
  deadline: TimestampString;
}
```
### Return Type
Recall that executing the `CreateNewProject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateNewProjectData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateNewProjectData {
  project_insert: Project_Key;
}
```
### Using `CreateNewProject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createNewProject, CreateNewProjectVariables } from '@dataconnect/generated';

// The `CreateNewProject` mutation requires an argument of type `CreateNewProjectVariables`:
const createNewProjectVars: CreateNewProjectVariables = {
  name: ..., 
  description: ..., 
  deadline: ..., 
};

// Call the `createNewProject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createNewProject(createNewProjectVars);
// Variables can be defined inline as well.
const { data } = await createNewProject({ name: ..., description: ..., deadline: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createNewProject(dataConnect, createNewProjectVars);

console.log(data.project_insert);

// Or, you can use the `Promise` API.
createNewProject(createNewProjectVars).then((response) => {
  const data = response.data;
  console.log(data.project_insert);
});
```

### Using `CreateNewProject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createNewProjectRef, CreateNewProjectVariables } from '@dataconnect/generated';

// The `CreateNewProject` mutation requires an argument of type `CreateNewProjectVariables`:
const createNewProjectVars: CreateNewProjectVariables = {
  name: ..., 
  description: ..., 
  deadline: ..., 
};

// Call the `createNewProjectRef()` function to get a reference to the mutation.
const ref = createNewProjectRef(createNewProjectVars);
// Variables can be defined inline as well.
const ref = createNewProjectRef({ name: ..., description: ..., deadline: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createNewProjectRef(dataConnect, createNewProjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.project_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.project_insert);
});
```

