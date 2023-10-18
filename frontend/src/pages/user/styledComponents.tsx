import styled from 'styled-components';

export const Container = styled.div`
  padding: 40px;
  font-family: 'Arial', sans-serif;  // Consider using a more unique font for a truly professional look
  background-color: #f5f5f5;
`;

export const Title = styled.h1`
  margin-bottom: 30px;
  font-size: 24px;
  color: #333;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead``;

export const TableRow = styled.tr``;

export const TableHeader = styled.th`
  padding: 15px 20px;
  text-align: left;
  background-color: #333;
  color: #fff;
  border: 1px solid #ddd;

  &:hover {
    background-color: #555;
  }
`;

export const TableBody = styled.tbody``;

export const TableCell = styled.td`
  padding: 10px 20px;
  border: 1px solid #ddd;
`;

export const Link = styled.a`
  color: #0077cc;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
