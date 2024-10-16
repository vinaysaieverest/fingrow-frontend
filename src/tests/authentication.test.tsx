// import { render, screen, fireEvent ,waitFor} from '@testing-library/react';
// import { LoginPage } from '../components/login';
// import userEvent from '@testing-library/user-event';
// import { dataContext } from '../context/GlobalContext';
// import axios from 'axios';

// const mockSetIsLogin = jest.fn();
// const mockSetUsername = jest.fn();
// const mockSetLoginUsername = jest.fn();
// jest.mock('axios');
// describe('LoginPage', () => {
//     beforeEach(() => {
//             jest.clearAllMocks();
//           });

//     test("should check input field",()=>{
//         render(
//             <dataContext.Provider value={{
//               loginUsername: 'Vinay',
//               setLoginUsername: mockSetLoginUsername,
//               isLogin: false,
//               setIslogin: mockSetIsLogin,
//               setUsername: mockSetUsername,
//             }}>
//               <LoginPage />
//             </dataContext.Provider>
//           );
//         const userInput = screen.getByTestId("userInput")
//         expect(userInput).toBeInTheDocument(),
//         expect(userInput).toHaveAttribute("type","input")
//     })
//     test('should test the input of taking correctly',()=>{
//         render(
//             <dataContext.Provider value={{
//               loginUsername: 'Vinay',
//               setLoginUsername: mockSetLoginUsername,
//               isLogin: false,
//               setIslogin: mockSetIsLogin,
//               setUsername: mockSetUsername,
//             }}>
//               <LoginPage />
//             </dataContext.Provider>
//           );
//         const userInput = screen.getByTestId("userInput")
//         userEvent.type(userInput, "Vinay");
//         expect(screen.getByTestId("userInput")).toHaveValue("Vinay");
//     })
   

// });
// describe('LoginPage', () => {
//   test('successful login triggers appropriate state changes', async () => {
//     // Mock the axios POST request
//     (axios.post as jest.Mock).mockResolvedValue({
//       status: 200,
//       data: { success: true },
//     });

//     render(
//       <dataContext.Provider value={{
//         loginUsername: 'testUser',
//         setLoginUsername: mockSetLoginUsername,
//         isLogin: false,
//         setIslogin: mockSetIsLogin,
//         setUsername: mockSetUsername,
//       }}>
//         <LoginPage />
//       </dataContext.Provider>
//     );

//     // Simulate typing username and password
//     fireEvent.change(screen.getByTestId('userInput'), { target: { value: 'testUser' } });
//     fireEvent.change(screen.getByTestId('passwordInput'), { target: { value: 'password123' } });

//     fireEvent.click(screen.getByText(/login/i));

//     await waitFor(() => {
//       expect(axios.post).toHaveBeenCalledWith('http://localhost:5005/api/login', {
//         name: 'testUser',
//         password: 'password123',
//       });

//       expect(mockSetIsLogin).toHaveBeenCalledWith(true);
//       expect(mockSetUsername).toHaveBeenCalledWith('testUser');
//     });
//   });

//   test('handles invalid login with alert for no user found', async () => {
//     // Mock the axios POST request to simulate a 409 response
//     (axios.post as jest.Mock).mockResolvedValue({
//       status: 409,
//     });

//     window.alert = jest.fn();

//     render(
//       <dataContext.Provider value={{
//         loginUsername: 'testUser',
//         setLoginUsername: mockSetLoginUsername,
//         isLogin: false,
//         setIslogin: mockSetIsLogin,
//         setUsername: mockSetUsername,
//       }}>
//         <LoginPage />
//       </dataContext.Provider>
//     );

//     // Simulate typing username and password
//     fireEvent.change(screen.getByTestId('userInput'), { target: { value: 'testUser' } });
//     fireEvent.change(screen.getByTestId('passwordInput'), { target: { value: 'password123' } });

//     // Simulate login button click
//     fireEvent.click(screen.getByText(/login/i));

//     await waitFor(() => {
//       // Expect axios POST to be called
//       expect(axios.post).toHaveBeenCalledWith('http://localhost:5005/api/login', {
//         name: 'testUser',
//         password: 'password123',
//       });

//       expect(window.alert).toHaveBeenCalledWith('No user found, Please register');

//       expect(mockSetLoginUsername).toHaveBeenCalledWith('');
//     });
//   });

//   test('displays error on failed API request', async () => {
//     (axios.post as jest.Mock).mockResolvedValue(new Error('Failed request'));

//     render(
//       <dataContext.Provider value={{
//         loginUsername: 'testUser',
//         setLoginUsername: mockSetLoginUsername,
//         isLogin: false,
//         setIslogin: mockSetIsLogin,
//         setUsername: mockSetUsername,
//       }}>
//         <LoginPage />
//       </dataContext.Provider>
//     );

//     fireEvent.change(screen.getByTestId('userInput'), { target: { value: 'testUser' } });
//     fireEvent.change(screen.getByTestId('passwordInput'), { target: { value: 'password123' } });

//     fireEvent.click(screen.getByText(/login/i));

//     await waitFor(() => {
//       expect(axios.post).toHaveBeenCalledWith('http://localhost:5005/api/login', {
//         name: 'testUser',
//         password: 'password123',
//       });

//       expect(console.error).toHaveBeenCalledWith('Error pushing data to the database:', expect.anything());
//     });
//   });
// });


// // import axios from 'axios';
// // import { render, fireEvent, screen, waitFor } from '@testing-library/react';
// // import { LoginPage } from '../components/login';

// // jest.mock('axios');
// // const mockedAxios = axios as jest.Mocked<typeof axios>;

// // test('successful login triggers appropriate state changes', async () => {
// //   // Mock the axios POST request
// //   mockedAxios.post.mockResolvedValue({
// //     status: 200,
// //     data: { success: true },
// //   });

// //   // Render your component and simulate interactions
// //   render(<LoginPage />);
  
// //   // Simulate form submission, button click, etc.
// //   const submitButton = screen.getByText(/login/i); // Adjust based on your button text
// //   fireEvent.click(submitButton);

// //   // Wait for state changes or DOM updates
// //   await waitFor(() => {
// //     // Assertions on the component's behavior after successful login
// //     expect(screen.getByText(/welcome/i)).toBeInTheDocument(); // Example, adjust based on your UI
// //   });
// // });


import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { LoginPage } from '../components/login';
import { dataContext } from '../context/GlobalContext';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import axios from 'axios';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>


describe('LoginPage', () => {
  test('renders login form with username and password input fields', () => {
    // Mock the context values
    const mockContextValue = {
      loginUsername: '',
      setLoginUsername: jest.fn(),
      isLogin: false,
      setIslogin: jest.fn(),
      setUsername: jest.fn(),
    };

    render(
      <dataContext.Provider value={mockContextValue}>
        <LoginPage />
      </dataContext.Provider>
    );

    // Check for username input
    const userInput = screen.getByTestId('userInput');
    expect(userInput).toBeInTheDocument();

    // Check for password input
    const passwordInput = screen.getByTestId('passwordInput');
    expect(passwordInput).toBeInTheDocument();

    // Check for login button
    const loginButton = screen.getByTestId('loginButton');
    expect(loginButton).toBeInTheDocument();
  });


    test('successful login triggers appropriate state changes', async () => {
        const mockContextValue = {
            loginUsername: '',
            setLoginUsername: jest.fn(),
            isLogin: false,
            setIslogin: jest.fn(),
            setUsername: jest.fn(),
          };
      
          render(
            <dataContext.Provider value={mockContextValue}>
              <LoginPage />
            </dataContext.Provider>
          ); 
        
        
        // Mock the axios POST request
          mockedAxios.post.mockResolvedValue({
            status: 200,
            data: { success: true },
          });
          
          // Simulate form submission, button click, etc.
          const submitButton = screen.getByTestId('loginButton');
          fireEvent.click(submitButton);

    
  });
  test('displays what are value that we have entered', async () => {
    const mockContextValue = {
        loginUsername: 'Vinay',
        loginPassword:"Vinaysai02",
        setLoginUsername: jest.fn(),
        isLogin: false,
        setIslogin: jest.fn(),
        setUsername: jest.fn(),
      };
        (axios.post as jest.Mock).mockResolvedValue(mockContextValue);
        
        render(
          <dataContext.Provider value={mockContextValue}>
            <LoginPage />
          </dataContext.Provider>
        );
    
        fireEvent.change(screen.getByTestId('userInput'), { target: { value: 'Vinay' } });
        fireEvent.change(screen.getByTestId('passwordInput'), { target: { value: 'Vinaysai02' } });
    
        fireEvent.click(screen.getByTestId('loginButton'));
    
        await waitFor(() => {
          expect(axios.post).toHaveBeenCalledWith('http://localhost:5005/api/login', {
            name: 'Vinay',
            password: 'Vinaysai02',
          });
    
        });
      });


});


