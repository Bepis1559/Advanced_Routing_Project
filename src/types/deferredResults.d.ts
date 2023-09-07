type postsDeferredResult = Record<string, Promise<post[]>>;
type usersDeferredResult = Record<string, Promise<user[]>>;
type todosDeferredResult = Record<string, Promise<todo[]>>;
type postDeferredResult = {
  currentPostPromise: Promise<post>;
  currentUserPromise: Promise<user>;
  allCommentsPromise: Promise<comment[]>;
};
type editPostDeferredResult = {
  currentPostPromise: Promise<post>;
  currentUserPromise: Promise<user>;
};
