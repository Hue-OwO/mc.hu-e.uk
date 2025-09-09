import { GetServerSideProps } from 'next';
import {Profile} from '@/lib/minecraft/profile';
import Skin from '@/components/skin';
import style from '../styles/style.module.css';
import Search from '@/components/search';
import Raw from '@/components/raw';

interface Property {
  name: string;
  value: string;
}

interface ProfileProps {
  profile: {
    id: string;
    name: string;
    properties: Property[];
  };
}

export default function user({ profile }: ProfileProps) {
  return (
    <div className={style.profile}>
      <div className={style.user}>
      <div className={style.userMargin}>
        <div className={style.username}>
          {profile.name}
        </div>
       {profile.properties.map((prop, index) => {
        let props = atob(prop.value)
        let properties = JSON.parse(props)
        return (
          <div className={style.skin}>
            <Skin properties={properties} />
          </div>
        )
       })}
      </div>
      <div className={style.side}>
          <Raw data={profile} />
       </div>
     </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, params } = context;
  const { user } = params!;
  const username:any = Array.isArray(user) ? user.join('/') : user;
  const profile = await Profile.fetch(username)

  return {
    props: {
      profile: profile,
    },
  };
};