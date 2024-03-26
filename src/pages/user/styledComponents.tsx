import styled from 'styled-components';

// This is a acontainer with a gradient background, padding, and a custom font. On hover, it shows a shadow.
export const Container = styled.div`
  padding: 40px;
  font-family: 'Poppins', sans-serif;  
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  transition: box-shadow 0.5s ease; 

  &:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
}
`;

// This styles a title with a bottom margin, custom font size, color, and a text shadow.

export const Title = styled.h1`
  margin-bottom: 30px;
  font-size: 26px;
  color: #333;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
`;
// This styles a table styled to take up the full width with rounded corners, a shadow, and collapsed borders.

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
`;

export const TableHead = styled.thead``;

//This styles table rows with alternating backgrounds for even rows.
export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;
// This styles Table headers with padding, left alignment, and hover effect that changes the background color.

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

// This stylesTable cells styled with padding and a top border.
export const TableCell = styled.td`
  padding: 10px 20px;
  border-top: 1px solid #ddd;
`;

// This styles link with a custom color. On hover, it gets underlined and the color darkens.
export const Link = styled.a`
  color: #0077cc;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    text-decoration: underline;
    color: #0055aa;
  }
`;

// An applicant title styled with a custom color, font size, and a bottom margin.
export const ApplicantTitle = styled.h2`
    color: #333;
    font-size: 24px;
    margin-bottom: 15px;
`;

// Applicant info paragraph with custom font size and color. On hover, it enlarges.
export const ApplicantInfo = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
  color: #666;
  transition: font-size 0.3s ease;  // smooth transition for enlarging effect

  &:last-of-type {
    margin-bottom: 0;
  }

  &:hover {
      font-size: 18px;  // increased font size on hover
      // font-weight: bold;  // uncomment if you'd like to make it bold on hover
  }
`;

// A navbar styled with a background color, padding, and flexbox for content alignment.

export const Navbar = styled.div`
  background-color: #333;
  color: white;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// Navbar buttons with no border, custom padding, rounded corners, and a hover effect that darkens the background.

export const NavbarButton = styled.button`
  background-color: #555;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #777;
  }
`;

export const Input = styled.input`
  padding: 10px; // Adjust padding as needed
  margin-bottom: 10px; // Adjust margin as needed
  border: 1px solid #ccc; // Adjust border as needed
  border-radius: 4px; // Adjust for rounded corners
  font-size: 16px; // Adjust font size as needed
  // Add more styling here to match your NavbarButton
`;

export const Titles = styled.h1`
  margin-bottom: 30px;
  font-size: 26px;
  color: #333;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

