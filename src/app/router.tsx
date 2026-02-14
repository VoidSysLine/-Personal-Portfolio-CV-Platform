import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense, type ReactNode } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { PageLayout } from '@/layouts/PageLayout';
import { Skeleton } from '@/components/ui/Skeleton';

const ProfilePage = lazy(() => import('@/features/profile/ProfilePage'));
const CareerPage = lazy(() => import('@/features/career/CareerPage'));
const EducationPage = lazy(() => import('@/features/education/EducationPage'));
const ProjectsPage = lazy(() => import('@/features/projects/ProjectsPage'));
const CertificatesPage = lazy(() => import('@/features/certificates/CertificatesPage'));
const BlogPage = lazy(() => import('@/features/blog/BlogPage'));
const BlogDetailPage = lazy(() => import('@/features/blog/BlogDetailPage'));
const TestimonialsPage = lazy(() => import('@/features/testimonials/TestimonialsPage'));
const ContactPage = lazy(() => import('@/features/contact/ContactPage'));
const ImprintPage = lazy(() => import('@/features/legal/ImprintPage'));
const PrivacyPage = lazy(() => import('@/features/legal/PrivacyPage'));
const PrintPage = lazy(() => import('@/features/print/PrintPage'));

function PageSuspense({ children }: { children: ReactNode }): ReactNode {
  return (
    <Suspense fallback={<div className="p-8"><Skeleton className="h-96 w-full" /></div>}>
      {children}
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <PageSuspense><ProfilePage /></PageSuspense>,
      },
      {
        path: 'career',
        element: <PageSuspense><PageLayout><CareerPage /></PageLayout></PageSuspense>,
      },
      {
        path: 'education',
        element: <PageSuspense><PageLayout><EducationPage /></PageLayout></PageSuspense>,
      },
      {
        path: 'projects',
        element: <PageSuspense><PageLayout><ProjectsPage /></PageLayout></PageSuspense>,
      },
      {
        path: 'certificates',
        element: <PageSuspense><PageLayout><CertificatesPage /></PageLayout></PageSuspense>,
      },
      {
        path: 'blog',
        element: <PageSuspense><PageLayout><BlogPage /></PageLayout></PageSuspense>,
      },
      {
        path: 'blog/:slug',
        element: <PageSuspense><PageLayout><BlogDetailPage /></PageLayout></PageSuspense>,
      },
      {
        path: 'testimonials',
        element: <PageSuspense><PageLayout><TestimonialsPage /></PageLayout></PageSuspense>,
      },
      {
        path: 'contact',
        element: <PageSuspense><PageLayout><ContactPage /></PageLayout></PageSuspense>,
      },
      {
        path: 'imprint',
        element: <PageSuspense><PageLayout><ImprintPage /></PageLayout></PageSuspense>,
      },
      {
        path: 'privacy',
        element: <PageSuspense><PageLayout><PrivacyPage /></PageLayout></PageSuspense>,
      },
    ],
  },
  {
    path: '/print',
    element: <PageSuspense><PrintPage /></PageSuspense>,
  },
]);
