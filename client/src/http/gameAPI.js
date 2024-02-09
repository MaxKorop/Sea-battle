import { $authHost } from ".";

export const statistic = async () => {
    const { data } = await $authHost.get('statistic');
    return data.statistic;
}

export const shot = async () => {
    const { data } = await $authHost.get('shot');
    return data.statistic;
}

export const hit = async () => {
    const { data } = await $authHost.get('hit');
    return data.statistic;
}

export const battles = async () => {
    const { data } = await $authHost.get('battle');
    return data.statistic;
}

export const wins = async () => {
    const { data } = await $authHost.get('winning');
    return data.statistic;
}

export const loses = async () => {
    const { data } = await $authHost.get('losing');
    return data.statistic;
}