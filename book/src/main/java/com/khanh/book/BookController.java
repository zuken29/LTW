package com.khanh.book;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.security.auth.message.callback.PrivateKeyCallback.Request;

@RestController
@RequestMapping(path = "/", produces = "application/json")
@CrossOrigin(origins = "*")
public class BookController {
	@GetMapping("/books")

	public List<Book> getBooks(Model model) throws IOException {
		Connection connection = null;
		Statement statement = null;
		ResultSet resultSet = null;
		List<Book> books = new ArrayList<Book>();
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbc_demo", "root", "12345");
			statement = connection.createStatement();
			resultSet = statement.executeQuery("select * from book");
			while (resultSet.next()) {
				int bookcode = resultSet.getInt("bookcode");
				String title = resultSet.getString("title");
				String author = resultSet.getString("author");
				String category = resultSet.getString("category");
				int sold = resultSet.getInt("sold");
				books.add(new Book(bookcode, title, author, category, sold == 0 ? false : true));
			}
		} // End of try block
		catch (Exception e) {
			e.printStackTrace();
		}
		model.addAttribute("books", books);
		return books;
	}

	@GetMapping("/books/{key}")
	public String getBooksByKey(Model model, @PathVariable("key") String key) throws IOException {
		Connection connection = null;
		Statement statement = null;
		ResultSet resultSet = null;
		List<Book> books = new ArrayList<Book>();
		System.out.println("Key " + key);
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbc_demo", "root", "12345");
			statement = connection.createStatement();
			resultSet = statement
					.executeQuery("select * from book where title like '%" + key + "%' or author like '%" + key + "%'");

			while (resultSet.next()) {
				int bookcode = resultSet.getInt("bookcode");
				String title = resultSet.getString("title");
				String author = resultSet.getString("author");
				String category = resultSet.getString("category");
				int sold = resultSet.getInt("sold");
				books.add(new Book(bookcode, title, author, category, sold == 0 ? false : true));
			}
		} // End of try block
		catch (Exception e) {
			e.printStackTrace();
		}
		model.addAttribute("books", books);
		return "books";
	}

	@GetMapping("/book/{bookcode}")
	public Book getBookByCode(Model model, @PathVariable String bookcode) {
		model.addAttribute("bookcode", bookcode);
		Connection connection = null;
		PreparedStatement ps = null;
		ResultSet result = null;

		Book book = new Book();
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbc_demo", "root", "12345");
			ps = connection.prepareStatement("select * from book where bookcode = ?");
			ps.setInt(1, Integer.valueOf(bookcode));
			result = ps.executeQuery();
			while (result.next()) {
				book.setBookcode(result.getInt("bookcode"));
				book.setTitle(result.getString("title"));
				book.setAuthor(result.getString("author"));
				book.setCategory(result.getString("category"));
				book.setSold(result.getInt("sold") != 0 ? true : false);
			}
		} // End of try block
		catch (Exception e) {
			e.printStackTrace();
		}
		model.addAttribute("book", book);
		return book;
	}

	@PostMapping(path = "/book/add", consumes = "application/json")
	public String createBook(Model model, @RequestBody Book book) {
		Connection connection = null;
		PreparedStatement ps = null;
		ResultSet result = null;

		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbc_demo", "root", "12345");
			ps = connection.prepareStatement(
					"INSERT INTO book (bookcode, title, author, category, sold) VALUES (?, ?, ?, ?, ?)");
			ps.setInt(1, book.getBookcode());
			ps.setString(2, book.getTitle());
			ps.setString(3, book.getAuthor());
			ps.setString(4, book.getCategory());
			ps.setBoolean(5, book.isSold());
			ps.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (result != null)
					result.close();
				if (ps != null)
					ps.close();
				if (connection != null)
					connection.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		return "redirect:/books"; // assuming "/books" is the URL to the book list page
	}

	@PutMapping(path = "/book/{bookcode}", consumes = "application/json")
	public String updateBook(@PathVariable String bookcode, @RequestBody Book book) {
		Connection connection = null;
		PreparedStatement ps = null;
		ResultSet result = null;

		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbc_demo", "root", "12345");
			ps = connection.prepareStatement(
					"UPDATE book SET title = ?, author = ?, category = ?, sold = ? WHERE bookcode = ?");
			ps.setString(1, book.getTitle());
			ps.setString(2, book.getAuthor());
			ps.setString(3, book.getCategory());
			ps.setBoolean(4, book.isSold());
			ps.setInt(5, Integer.parseInt(bookcode));
			ps.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (result != null)
					result.close();
				if (ps != null)
					ps.close();
				if (connection != null)
					connection.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		return "update";
	}
	
	@DeleteMapping(path = "/book/{bookcode}", consumes = "application/json")
	public String deleteBook(Model model, @PathVariable String bookcode) {
	    Connection connection = null;
	    PreparedStatement ps = null;
	    try {
	        Class.forName("com.mysql.cj.jdbc.Driver");
	        connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbc_demo", "root", "12345");
	        ps = connection.prepareStatement("DELETE FROM book WHERE bookcode = ?");
	        ps.setInt(1, Integer.parseInt(bookcode));
	        ps.executeUpdate();
	    } catch (Exception e) {
	        e.printStackTrace();
	    } finally {
	        try {
	            if (ps != null)
	                ps.close();
	            if (connection != null)
	                connection.close();
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	    }

	    return "delete"; // assuming "/books" is the URL to the book list page
	}

}
