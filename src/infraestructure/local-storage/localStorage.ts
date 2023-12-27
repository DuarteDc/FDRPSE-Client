const get = (key: string): string => {
    const item = localStorage.getItem(key) || '';
    return JSON.parse(item);
}

const set = (key: string, body: any) => {
    const content = JSON.stringify(body);
    localStorage.setItem(key, content);
}

const remove = (key: string) => {
    localStorage.removeItem(key);
}

const removeAll = () => {
    localStorage.clear();
}

export const storage = {
    get,
    set,
    remove,
    removeAll,
}