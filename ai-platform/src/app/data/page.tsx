import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import DataHubClient from './DataHubClient';

export default async function DataHubPage() {
    const session = await auth();
    if (!session) {
        redirect('/login');
    }

    return <DataHubClient session={session} />;
}
