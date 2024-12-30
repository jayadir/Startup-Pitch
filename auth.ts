import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import { QUERY_CHECK_AUTHOR } from './sanity/lib/queries'
import { writeClient } from './sanity/lib/write-client'
import { client } from './sanity/lib/client'
export const { handlers, signIn, signOut, auth } = NextAuth(
    {
        providers: [GitHub],
        callbacks: {
            async signIn({ user, account, profile }) {
                if (profile?.id) {
                    console.log("in signin",profile);
                    const userExist = await client.withConfig({ useCdn: false }).fetch(QUERY_CHECK_AUTHOR, { id: profile.id });
                    if (!userExist) {
                        await writeClient.create({
                            _type: "author",
                            id: profile.id,
                            name: user?.name,
                            username: profile?.login,
                            email: profile?.email,
                            image: user?.image,
                            bio: profile?.bio || ""
                        });
                    }
                    return true;
                }
                return false;
            },
            async jwt({ token, user, account, profile }) {
                if (account && profile?.id) {
                    const fetchedUser = await client.withConfig({ useCdn: false }).fetch(QUERY_CHECK_AUTHOR, { id: profile.id });
                    token.id = fetchedUser?._id;
                }
                return token;
            },
            async session({ session, token }) {
                session.id = token.id;
                return session;
            }
        }
    }
)