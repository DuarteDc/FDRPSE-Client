import { Route, Routes } from 'react-router-dom';
import { DomainsPage, CreateDomainPage } from '../../app/pages';

export const DomainRoutes = () => {
  return (
    <Routes>
      <Route path="/" index element={<DomainsPage />} />
      <Route path="/create" element={<CreateDomainPage />} />
    </Routes>
  )
}
