import { render, screen, within } from '@testing-library/react';
import Layout from '../../components/Layout';
import { axe } from 'jest-axe'; // Import axe

describe('Layout Component', () => {
  it('renders the main navigation links and its children', () => {
    render(
      <Layout>
        <p>This is the page content.</p>
      </Layout>
    );

    const mainNav = screen.getByRole('navigation');
    expect(within(mainNav).getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(within(mainNav).getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(within(mainNav).getByRole('link', { name: /services/i })).toBeInTheDocument();
    expect(within(mainNav).getByRole('link', { name: /contact/i })).toBeInTheDocument();
    expect(screen.getByText('This is the page content.')).toBeInTheDocument();
  });

  // vv NEW TEST CASE FOR ACCESSIBILITY vv
  it('has no accessibility violations', async () => {
    // Render the component into a container
    const { container } = render(
      <Layout>
        <p>Some content</p>
      </Layout>
    );

    // Run the axe check on the rendered HTML
    const results = await axe(container);

    // Assert that there are no violations
    expect(results).toHaveNoViolations();
  });
});