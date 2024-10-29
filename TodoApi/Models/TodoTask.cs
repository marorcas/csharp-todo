namespace TodoApi.Models {
    public class TodoTask {
        public long Id { get; set; }
        public required string Name { get; set; }
        public bool Completed { get; set; }
        public bool Priority { get; set; }
    }
}