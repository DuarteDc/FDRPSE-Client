const get = (key: string): string | null => {
    const item = localStorage.getItem(key) ?? "";
    
    return item && typeof item === 'string' ? JSON.parse(item || '') : null;
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