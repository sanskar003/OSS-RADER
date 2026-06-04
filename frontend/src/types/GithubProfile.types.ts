export type GithubProfile = {
  identity: {
    username: string;
    name: string;
    avatar: string;
    githubUrl: string;
  };

  about: {
    bio: string | null;
    location: string | null;
    company: string | null;
    email: string | null;
    type: string;
    hireable: boolean;
  };

  stats: {
    followers: number;
    following: number;
    publicRepos: number;
    publicGists: number;
  };

  meta: {
    createdAt: string;
    updatedAt: string;
  };
};