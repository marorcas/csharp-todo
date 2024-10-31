using TodoApi.Models;
using Xunit;

namespace TodoApi.Tests;

public class TodoTaskTests {
    [Fact]
    public void Id_ShouldExist() {
        var task = new TodoTask { Name = "Test Task" };

        Assert.True(task.Id > 0, "ID should be greater than zero to indicate it exists.");
    }

    [Fact]
    public void Title_ShouldBeSetCorrectly() {
        var task = new TodoTask { Name = "Test Task" };

        var title = task.Name;

        Assert.Equal("Test Task", title);
    }

    [Fact]
    public void Completed_ShouldBeSetToFalse() {
        var task = new TodoTask { Name = "Test Task" };

        Assert.Equal(task.Completed, false);
    }

    [Fact]
    public void Priority_ShouldBeSetToFalse() {
        var task = new TodoTask { Name = "Test Task" };

        Assert.Equal(task.Priority, false);
    }
}
