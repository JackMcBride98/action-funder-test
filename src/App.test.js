import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

it('should correctly set the default option', () => {
  render(<App />);
  expect(
    screen.getByRole('option', { name: '-- select an option --' }).selected
  ).toBe(true);
});

it('should display the correct number of options', () => {
  render(<App />);
  expect(screen.getAllByRole('option').length).toBe(5);
});

it('should allow user to change sort by option', () => {
  render(<App />);
  userEvent.selectOptions(
    screen.getByRole('combobox'),
    screen.getByRole('option', { name: 'Price: High to Low' })
  );
  expect(
    screen.getByRole('option', { name: 'Price: High to Low' }).selected
  ).toBe(true);
});

it('should display the fund with the highest amount when sorted by price: high to low', () => {
  render(<App />);
  userEvent.selectOptions(
    screen.getByRole('combobox'),
    screen.getByRole('option', { name: 'Price: High to Low' })
  );
  expect(screen.getAllByTestId('fund-amount')[0]).toHaveTextContent(
    'Total fund amount: £60,000'
  );
});

it('should display the fund that comes first in alphabetical order when sorted by Alphabetically: A to Z', () => {
  render(<App />);
  userEvent.selectOptions(
    screen.getByRole('combobox'),
    screen.getByRole('option', { name: 'Alphabetically: A to Z' })
  );
  expect(screen.getAllByTestId('fund-name')[0]).toHaveTextContent(
    'Gordon’s Wine Bar Community Fund'
  );
});
