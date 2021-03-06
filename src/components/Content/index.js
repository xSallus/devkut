import { Actions, Stat, StatsWrapper, MHeader } from "@/styles/home";
import { Container } from "@/components/Container";

import { Favorite } from "@material-ui/icons";
import { Star } from "@material-ui/icons";
import { EmojiEmotions } from "@material-ui/icons";
import { Email } from "@material-ui/icons";
import { MenuBook } from "@material-ui/icons";
import { PhotoCamera } from "@material-ui/icons";
import { Videocam } from "@material-ui/icons";
import { Bookmark } from "@material-ui/icons";

import { useDevkut } from "@/hooks";

function ContentContainer() {
  const { user, communities, setCommunities } = useDevkut();

  return (
    <>
      <Container>
        <MHeader>
          <h1>{`Welcome, ${user.name}`}</h1>
          <p>
            <span>Today&#39;s luck: </span>The best future prophet is the past.
          </p>
        </MHeader>
        <div className="statsArea">
          <Stat>
            <p>Recados</p>
            <StatsWrapper>
              <MenuBook />
              <span>{user.counts.recados??0}</span>
            </StatsWrapper>
          </Stat>
          <Stat>
            <p>Photos</p>
            <StatsWrapper>
              <PhotoCamera />
              <span>{user.counts.photos??0}</span>
            </StatsWrapper>
          </Stat>
          <Stat>
            <p>Videos</p>
            <StatsWrapper>
              <Videocam />
              <span>{user.counts.videos??0}</span>
            </StatsWrapper>
          </Stat>
          <Stat>
            <p>Fans</p>
            <StatsWrapper>
              <Star />
              <span>{user.counts.fans??0}</span>
            </StatsWrapper>
          </Stat>
          <Stat>
            <p>Messages</p>
            <StatsWrapper>
              <Email />
              <span>{user.counts.msgs??0}</span>
            </StatsWrapper>
          </Stat>
          <Stat>
            <p>Trusty</p>
            <StatsWrapper>
              <EmojiEmotions
                className={user.stats.trusty === 0 ? "" : "active"}
              />
              <EmojiEmotions
                className={user.stats.trusty < 2 ? "" : "active"}
              />
              <EmojiEmotions
                className={user.stats.trusty > 2 ? "active" : ""}
              />
            </StatsWrapper>
          </Stat>
          <Stat>
            <p>Nice</p>
            <StatsWrapper>
              <Bookmark className={user.stats.nice === 0 ? "" : "active"} />
              <Bookmark className={user.stats.nice === 0 ? "" : "active"} />
              <Bookmark className={user.stats.nice === 0 ? "" : "active"} />
            </StatsWrapper>
          </Stat>
          <Stat>
            <p>Sexy</p>
            <StatsWrapper>
              <Favorite className={user.stats.sexy === 0 ? "" : "active"} />
              <Favorite className={user.stats.sexy === 0 ? "" : "active"} />
              <Favorite className={user.stats.sexy === 0 ? "" : "active"} />
            </StatsWrapper>
          </Stat>
        </div>
      </Container>
      <Container>
        <Actions>
          <h3>What you wanna do</h3>
          <form onSubmit={(e)=> {
            e.preventDefault()

            const communityData = new FormData(e.target)

            const community = {
              title: communityData.get('title'),
              pictureUrl: communityData.get('pictureUrl')
            }

            fetch('/api/communities', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(community)
            }).then(async (res) => {
              const {community} = await res.json()
              // console.log(community)
              setCommunities([...communities, {
                id: community.id,
                title: community.title,
                picture: community.pictureUrl
              }])
            })

          }} >
            <div className="actionButtons">
              <button>
                <span>Create comunity</span>
              </button>
              <button>
                <span>Write deposition</span>
              </button>
              <button>
                <span>Leave a scrap</span>
              </button>
            </div>
            <input type="text" name="title" placeholder="What will be the community name." />
            <input type="text" name="pictureUrl" placeholder="Insert picture url for the new community." />
          </form>
        </Actions>
      </Container>
    </>
  );
}

export { ContentContainer };
