

export const getCurrentPath = (path: string, currentPath: string) => {
  if (path === '/auth' && currentPath === '/auth') return 'bg-emerald-600 text-white shadow-lg font-bold';
  return (path.includes(currentPath) && currentPath.length > 6) ? 'bg-emerald-600 text-white shadow-lg font-bold' : 'hover:bg-emerald-600 hover:text-white'
}
