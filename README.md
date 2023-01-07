# AngularProjetNutrition

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Petite Précision

## Api
Malheureusement il y a un nombre limiter de requête pour mon API c'est mon cela que dans l'onglet `My meal Plan` il y aura les mêmes images de background 

## Node Module
Une fois que vous avez lancez `npm install` il faudra modifier un fichier qui se situe dans le node_module ayant pour chemin `node_modules\@angular\fire\compat\firestore\interfaces.d.ts` il faudra rajouter <T> :

Le module est comme cela :

```
    export interface DocumentSnapshotExists<T> extends firebase.firestore.DocumentSnapshot {
    readonly exists: true;
    data(options?: SnapshotOptions): T;
}
export interface DocumentSnapshotDoesNotExist extends firebase.firestore.DocumentSnapshot {
    readonly exists: false;
    data(options?: SnapshotOptions): undefined;
    get(fieldPath: string | FieldPath, options?: SnapshotOptions): undefined;
}
export declare type DocumentSnapshot<T> = DocumentSnapshotExists<T> | DocumentSnapshotDoesNotExist;
export interface QueryDocumentSnapshot<T> extends firebase.firestore.QueryDocumentSnapshot {
    data(options?: SnapshotOptions): T;
}
export interface QuerySnapshot<T> extends firebase.firestore.QuerySnapshot{
    readonly docs: QueryDocumentSnapshot<T>[];
}
export interface DocumentChange<T> extends firebase.firestore.DocumentChange{

```
Devient :

```export interface DocumentSnapshotExists<T> extends firebase.firestore.DocumentSnapshot<T> {
    readonly exists: true;
    data(options?: SnapshotOptions): T;
}
export interface DocumentSnapshotDoesNotExist extends firebase.firestore.DocumentSnapshot {
    readonly exists: false;
    data(options?: SnapshotOptions): undefined;
    get(fieldPath: string | FieldPath, options?: SnapshotOptions): undefined;
}
export declare type DocumentSnapshot<T> = DocumentSnapshotExists<T> | DocumentSnapshotDoesNotExist;
export interface QueryDocumentSnapshot<T> extends firebase.firestore.QueryDocumentSnapshot<T> {
    data(options?: SnapshotOptions): T;
}
export interface QuerySnapshot<T> extends firebase.firestore.QuerySnapshot<T> {
    readonly docs: QueryDocumentSnapshot<T>[];
}
export interface DocumentChange<T> extends firebase.firestore.DocumentChange<T> {

```
