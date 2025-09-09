import axios from 'axios';

const minecraftApi = 'https://api.minecraftservices.com/minecraft';
const sessionServer = 'https://sessionserver.mojang.com';

class profile {
    async fetch(name: string) {
        const user = await axios.get(`${minecraftApi}/profile/lookup/name/${name}`).then((res) => {
            return res.data
        });
        const profile = await axios.get(`${sessionServer}/session/minecraft/profile/${user.id}`).then((res) => {
            return res.data
        });
        return profile
    }
}


export const Profile = new profile();