import { render, screen } from '@testing-library/react'
import Header from './Header'


test('debería renderizar el componente Header con el título', () => {
    const city = 'Palma';
    render(<Header title2={city} />)

    const headingElement = screen.getByRole('heading', { name: /Palma/i });

    expect(headingElement).toBeInTheDocument();
})

test('Debería no renderizar el segundo título cuando showTitle2 es false', () => {
    render(<Header showTitle2={false} />)
    const headingElement = screen.queryByRole('heading', { name: /Palma/i });

    expect(headingElement).not.toBeInTheDocument();




})