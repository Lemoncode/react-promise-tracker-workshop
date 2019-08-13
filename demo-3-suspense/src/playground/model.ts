export interface Movie {
  title: string;
  url: string;
}

export interface Actor {
  title: string;
  url: string;
}

export const createEmptyActor = (): Actor => ({
  title: '',
  url: '',
});

export interface ActorParam {
  id: number;
  delay: number;
}
