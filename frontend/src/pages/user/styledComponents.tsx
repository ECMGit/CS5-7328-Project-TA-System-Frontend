import styled from 'styled-components';


export const Container = styled.div`
  padding: 40px;
  font-family: 'Poppins', sans-serif;  
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

export const Title = styled.h1`
  margin-bottom: 30px;
  font-size: 26px;
  color: #333;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
`;

export const TableHead = styled.thead``;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const TableHeader = styled.th`
  padding: 15px 20px;
  text-align: left;
  background-color: #444;
  color: #fff;
  border-bottom: 1px solid #ddd;
  transition: background-color 0.2s;

  &:hover {
    background-color: #555;
  }
`;

export const TableBody = styled.tbody``;

export const TableCell = styled.td`
  padding: 10px 20px;
  border-top: 1px solid #ddd;
`;

export const Link = styled.a`
  color: #0077cc;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    text-decoration: underline;
    color: #0055aa;
  }
`;

